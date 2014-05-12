require "romo/version"

module Romo

  def self.gem_assets_path; self.gem_path.join('assets'); end

  private

  def self.gem_path
    @gem_path ||= Pathname(Gem.loaded_specs['romo'].full_gem_path)
  end

end
